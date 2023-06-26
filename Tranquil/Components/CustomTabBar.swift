//
//  CustomtabBar.swift
//  SwiftUIExample
//
//  Created by Ahmadreza on 4/12/22.
//

import SwiftUI

struct CustomTabBar: View {
    
    static let tabBarHeight: CGFloat = 60
    static let tabBarColor: UIColor = .systemBackground
    
    @Binding var selectedTab: Tab
    
    var body: some View {
        ZStack {
            VStack {
                Spacer()
                TabBarBackgroundView()
                    .frame(width: nil, height: abs(CustomTabBar.tabBarHeight), alignment: .bottom)
            }
            .frame(width: nil, height: nil)
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    TabContainerView {
                        FirstTabView(selectedTab: $selectedTab)
                    }
                    Spacer()
                    TabContainerView {
                        SecondTabView(selectedTab: $selectedTab)
                    }
                    Spacer()
                    TabContainerView {
                        ThirdTabView(selectedTab: $selectedTab)
                    }
                    Spacer()
                }
                .padding(.bottom)
            }
        }
        .frame(width: nil, height: nil)
    }
    
    struct TabContainerView<Content: View>: View {
        @ViewBuilder var content: Content
        var body: some View {
            content.frame(width: 50, height: CustomTabBar.tabBarHeight, alignment: .bottom)
        }
    }
    
    struct FirstTabView: View {
        @Binding var selectedTab: Tab
        var body: some View {
            Image(systemName: selectedTab == .Breathe ? "drop.fill" : "drop")
                .foregroundColor(selectedTab == .Breathe ? Globals().accentColor : Globals().primaryColor)
                .imageScale(.large)
                .onTapGesture(count: 1) {
                    self.selectedTab = .Breathe
                }
        }
    }
    
    struct SecondTabView: View {
        @Binding var selectedTab: Tab
        @State private var animationSize: Double = 0
        var body: some View {
            Image(systemName: selectedTab == .Habits ? "house.fill" : "house")
                .foregroundColor(selectedTab == .Habits ? Globals().accentColor : Globals().primaryColor)
                .imageScale(.large)
                .scaleEffect(x: 1 + (animationSize / 30), y: 1 + (animationSize / 30), anchor: .center)
                .animation(.spring(response: 0.5, dampingFraction: 0.5, blendDuration: 0.5), value: animationSize)
                .onTapGesture(count: 1) {
                    self.selectedTab = .Habits
                    self.animationSize = 10
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                        self.animationSize = 0
                    }
                }
        }
    }
    
    struct ThirdTabView: View {
        @Binding var selectedTab: Tab
        var body: some View {
            Image(systemName: selectedTab == .Journal ? "book.closed.fill" : "book.closed" )
                .foregroundColor(selectedTab == .Journal ? Globals().accentColor : Globals().primaryColor)
                .imageScale(.large)
                .onTapGesture(count: 1) {
                    self.selectedTab = .Journal
                }
        }
    }
    
    struct TabBarBackgroundView : View {
        var body: some View{
            HStack(alignment: .bottom, spacing: 0, content: {
                GeometryReader { proxy in
                    LinearGradient(gradient: Gradient(colors: [Color(CustomTabBar.tabBarColor), Color(CustomTabBar.tabBarColor)]), startPoint: .top, endPoint: .bottom)
                        .frame(height: CustomTabBar.tabBarHeight + proxy.safeAreaInsets.bottom)
                        .cornerRadius(Globals().cornerRadius, corners: [.topLeft, .topRight])
                }
            })
        }
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners
    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(roundedRect: rect, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
        return Path(path.cgPath)
    }
}

extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape( RoundedCorner(radius: radius, corners: corners) )
    }
}

