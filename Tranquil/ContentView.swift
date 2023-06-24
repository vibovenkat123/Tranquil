//
//  ContentView.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/22/23.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    var body: some View {
        TabView {
            HabitsView()
                .tabItem {
                    Label("Habits", systemImage: "leaf.fill")
                }
            JournalView()
                .modelContainer(for: Entry.self)
                .tabItem {
                    Label("Journal", systemImage: "book.closed.fill")
                }
            BreatheView()
                .tabItem {
                    Label("Breathe", systemImage: "cloud.fill")
                }
        }
        .onAppear() {
            let appearance = UITabBarAppearance()
            appearance.shadowColor = UIColor.lightGray

            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
}

