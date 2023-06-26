//
//  JournalView.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/24/23.
//

import SwiftUI
import SwiftData
import Foundation
extension UIApplication {
    func endEditing() {
        sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}

struct Background<Content: View>: View {
    @Environment(\.colorScheme) var colorScheme
    private var content: Content
    
    init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        GeometryReader { geo in
            Color(Globals().offPrimary)
                .frame(width: geo.size.width, height: geo.size.height)
                .overlay(content)
        }
    }
}

struct JournalView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \.date) var entries: [Entry]
    @State private var content = ""
    @State private var adjective = ""
    @FocusState private var contentFieldIsFocused: Bool
    @FocusState private var adjectiveFieldIsFocused: Bool
    @State private var invalidEntryFields = false
    @State private var dateAlreadyThere = false
    @State private var adjTooLong = false
    @State private var isDeleting = false
    let dateFormatter = DateFormatter()
    var body: some View {
        Background {
            VStack {
                if let entry = entries.last {
                    if Calendar.current.isDateInToday(entry.date) {
                        VStack {
                            Text("Entry:")
                                .font(.title)
                                .fontWeight(.bold)
                                .padding(.bottom)
                            
                            Text("\(dateFormatter.string(from: entry.date))")
                                .font(.headline)
                                .padding(.bottom)
                                .textSelection(.enabled)
                            
                            Text("""
                                \(entry.content)
                                """)
                            .font(.body)
                            .padding(.bottom)
                            .textSelection(.enabled)
                            
                            Text("\(entry.adjective)")
                                .font(.subheadline)
                                .foregroundStyle(Color(Globals().accentColor))
                                .padding()
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10)
                                        .stroke(Globals().accentColor, lineWidth: 2)
                                )
                                .textSelection(.enabled)
                                .padding(.bottom)
                            
                            Button("Delete", role: .destructive) {
                                isDeleting = true
                            }
                            .foregroundStyle(Color(Globals().offPrimary))
                            .padding()
                            .background(
                                RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                    .fill(.red)
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                    .stroke(.red)
                            )
                            .confirmationDialog("Are you sure?",
                                                isPresented: $isDeleting) {
                                Button("Delete entry?", role: .destructive) {
                                    context.delete(entry)
                                }
                            } message: {
                                Text("You cannot undo this action")
                            }
                        }
                    } else {
                        VStack {
                            Text("Entry:")
                                .font(.title)
                                .fontWeight(.bold)
                                .padding(.bottom)
                            
                            Text("Date: \(dateFormatter.string(from: entry.date))")
                                .font(.headline)
                                .padding(.bottom)
                            
                            Text("Content: \(entry.content)")
                                .font(.body)
                                .padding(.bottom)
                            
                            Text("Adjective: \(entry.adjective)")
                                .font(.body)
                        }
                    }
                } else {
                    Text("No entries yet!")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .padding(.bottom)
                }
                if entries.count == 0 || !Calendar.current.isDateInToday(entries.last!.date) {
                    VStack {
                        TextField(
                            "Write about your day",
                            text: $content,
                            axis: .vertical
                        )
                        .focused($contentFieldIsFocused)
                        .padding()
                        .overlay(
                            RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                .stroke(.secondary, lineWidth: 2)
                        )
                        .padding(.bottom)
                        
                        TextField(
                            "Write one adjective that describes your day",
                            text: $adjective
                        )
                        .focused($adjectiveFieldIsFocused)
                        .padding()
                        .overlay(
                            RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                .stroke(.secondary, lineWidth: 2)
                        )
                        .padding(.bottom)
                        
                        Button("Submit Entry") {
                            contentFieldIsFocused = false
                            adjectiveFieldIsFocused = false
                            adjective = adjective.trimmingCharacters(in: .whitespacesAndNewlines)
                            if (content.count == 0 || adjective.count == 0) {
                                invalidEntryFields = true
                                return
                            }
                            if adjective.components(separatedBy: " ").count != 1 || adjective.count > 20 {
                                adjTooLong = true
                                return
                            }
                            if !addEntry(content: content, adj: adjective) {
                                dateAlreadyThere = true
                            }
                            adjective = ""
                            content = ""
                        }
                        .frame(maxWidth: .infinity)
                        .alert("Make sure both the fields are filled out", isPresented: $invalidEntryFields) {
                            Button("OK", role: .cancel) { }
                        }
                        .alert("You already have an entry today", isPresented: $dateAlreadyThere) {
                            Button("OK", role: .cancel) { }
                        }
                        .alert("Your adjective is either too long (greater than 20 letters) or is not one word", isPresented: $adjTooLong) {
                            Button("OK", role: .cancel) { }
                        }
                        .font(.callout)
                        .foregroundStyle(Color(Globals().offPrimary))
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                .fill(Globals().accentColor)
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                .stroke(Globals().accentColor, lineWidth: 2)
                        )
                    }
                }
            }
            
            .onAppear(perform: {
                dateFormatter.dateFormat = "MM/dd/yyyy"
            })
            .padding()
        }
        .onTapGesture {
            contentFieldIsFocused = false
            adjectiveFieldIsFocused = false
        }
    }
    private func addEntry(content: String, adj: String) -> Bool {
        withAnimation {
            let found = entries.filter{Calendar.current.isDateInToday($0.date)}.count > 0
            if found {
                return false
            }
            let entry = Entry(date: Date.now, content: content, adjective: adj)
            context.insert(entry)
            return true
        }
    }
    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                context.delete(entries[index])
            }
        }
    }
}
