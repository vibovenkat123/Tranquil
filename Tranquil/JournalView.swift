//
//  JournalView.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/24/23.
//

import SwiftUI
import SwiftData
import Foundation

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
    let dateFormatter = DateFormatter()
    var body: some View {
        VStack {
            NavigationView {
                List {
                    ForEach(entries) { entry in
                        NavigationLink {
                            VStack {
                                Text("\(dateFormatter.string(from: entry.date))")
                                Text(entry.content)
                                Text(entry.adjective)
                            }
                        } label: {
                            Text("\(dateFormatter.string(from: entry.date))")
                            Text("Adjective: \(entry.adjective)")
                        }
                    }
                    .onDelete(perform: deleteItems)
                }
                .opacity(entries.isEmpty ? 0 : 1)
                .toolbar {
                    ToolbarItem(placement: .navigationBarTrailing) {
                        EditButton()
                    }
                }
            }
            VStack {
                TextField(
                    "Write about your day",
                    text: $content
                )
                .focused($contentFieldIsFocused)
                .padding()
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.secondary, lineWidth: 2)
                )
                TextField(
                    "Write one adjective that describes your day",
                    text: $adjective
                )
                .focused($adjectiveFieldIsFocused)
                .padding()
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.secondary, lineWidth: 2)
                )
                
                Button("Submit Entry") {
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
                }
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
                .foregroundStyle(.accent)
                .padding()
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.green, lineWidth: 2)
                )
            }
            .onAppear(perform: {
                dateFormatter.dateFormat = "MM/dd/yyyy"
            })
            .padding()
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
