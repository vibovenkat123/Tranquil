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
    @State private var content = """
    Write about your day
    
    
    So on
    """
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
                Text("Journal")
                    .font(CreateFont(.title))
                    .fontWeight(.bold)
                if let entry = entries.last {
                    if Calendar.current.isDateInToday(entry.date) {
                        VStack() {
                            HStack {
                              Spacer()
                            }
                            VStack {
                                HStack {
                                  Spacer()
                                }
                                Text("\(dateFormatter.string(from: entry.date))")
                                    .font(CreateFont(.headline))
                                    .padding(.bottom)
                                    .textSelection(.enabled)
                                ScrollView {
                                    Text("""
                                    \(entry.content)
                                    """)
                                    .font(Globals().font)
                                    .padding(.bottom)
                                    .fixedSize(horizontal: false, vertical: true)
                                    .lineLimit(5)
                                }
                                .frame(height: 5 * 50)
                                Text("\(entry.adjective)")
                                    .font(CreateFont(.subheadline))
                                    .padding()
                                    .overlay(
                                        RoundedRectangle(cornerRadius: 10)
                                            .stroke(Globals().primaryColor, lineWidth: 2)
                                    )
                                    .textSelection(.enabled)
                            }
                            .padding(.bottom)
                            .overlay(
                                RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                    .stroke(Globals().primaryColor, lineWidth: 2)
                            )
                            if Calendar.current.isDateInToday(entry.date) {
                                Button("Delete", role: .destructive) {
                                    isDeleting = true
                                }
                                .foregroundStyle(Color(Globals().offPrimary))
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                        .fill(Globals().primaryColor)
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                        .stroke(Globals().primaryColor)
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
                        }
                        .padding()
                    }
                } else {
                    Text("No entries yet!")
                        .font(CreateFont(.headline))
                        .fontWeight(.bold)
                        .padding(.bottom)
                }
                if entries.count == 0 || !Calendar.current.isDateInToday(entries.last!.date) {
                    VStack {
                        TextEditor(
                            text: $content
                        )
                        .frame(height: 80)
                        .focused($contentFieldIsFocused)
                        .padding()
                        .scrollContentBackground(.hidden)
                        .background(Color(Globals().offPrimary))
                        .overlay(
                            RoundedRectangle(cornerRadius: Globals().cornerRadius)
                                .stroke(.secondary, lineWidth: 2)
                        )
                        .padding(.bottom)
                        
                        TextField(
                            "",
                            text: $adjective,
                            prompt: Text("Write one adjective that describes your day")
                                .font(CreateFont(.callout))
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
                            content = content.trimmingCharacters(in: .whitespacesAndNewlines)
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
                        .font(CreateFont(.body))
                        .fontWeight(.bold)
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
