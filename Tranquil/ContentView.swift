
//  ContentView.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/22/23.
//

import SwiftUI
import SwiftData

enum Tab: Hashable {
    case Journal
    case Breathe
    case Habits
}

struct ContentView: View {
    @State var selectedTab = Tab.Habits
    var body: some View {
        VStack() {
            GeometryReader { proxy in
                CurrentTabPage(selectedTab: $selectedTab)
                    .frame(width: UIScreen.main.bounds.size.width,
                           height: UIScreen.main.bounds.size.height - (CustomTabBar.tabBarHeight + proxy.safeAreaInsets.bottom))
            }
            CustomTabBar(selectedTab: $selectedTab)
            
        }
        .background(Color(Globals().offPrimary)) .animation(.default, value: 1)
    }
}

struct CurrentTabPage: View {
    
    @Binding var selectedTab: Tab
    
    var body: some View {
        switch selectedTab {
        case .Journal:
            JournalView()
                .modelContainer(for: Entry.self)
        case .Habits:
            HabitsView()
        case .Breathe:
            BreatheView()
        }
    }
}
