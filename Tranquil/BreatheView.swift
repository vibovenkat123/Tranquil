//
//  BreatheView.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/23/23.
//

import SwiftUI

struct BreatheInfo {
    var text: String
    var opacity: Double
    var time: Double
    init(text: String, opacity: Double, time: Double) {
        self.text = text
        self.opacity = opacity
        self.time = time
    }
}

let breatheInInfo = BreatheInfo(text: "Breathe In...", opacity: 1.0, time: 4)
let holdInfo = BreatheInfo(text: "Hold...", opacity: 1.0, time: 2)
let breatheOutInfo = BreatheInfo(text: "Breathe Out...", opacity: 0.5, time: 8)

let breatheInfos: [Double: BreatheInfo] = [
    breatheInInfo.time: holdInfo,
    holdInfo.time: breatheOutInfo,
    breatheOutInfo.time: breatheInInfo
]

struct BreatheView: View {
    @State var started = false
    var body: some View {
        VStack {
            if (started) {
                BreathingView()
            } else {
                Button("Start Breathing") {
                    started = true
                }
                .font(.title2)
                .foregroundStyle(.accent)
                .padding()
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.green, lineWidth: 2)
                )
            }
        }
        .onAppear(perform: {
            started = false
        })
    }
}

struct BreathingView: View {
    @Environment(\.colorScheme) var colorScheme
    @State var text = breatheInInfo.text
    @State var time: Double = breatheOutInfo.time
    @State var timer = Timer.publish(every: breatheInInfo.time, on: .main, in: .common).autoconnect()
    @State var opacity = 0.0
    @State var oneTimeOpacity = 0.0
    let baseAnimation = Animation.easeInOut(duration: breatheInInfo.time)
    var body: some View {
        VStack {
            VStack {
                Text(text)
                    .font(.largeTitle)
                    .onReceive(timer, perform: { _ in
                        if let newBreatheInfo = breatheInfos[time] {
                            withAnimation(baseAnimation) {
                                opacity = newBreatheInfo.opacity
                            }
                            time = newBreatheInfo.time
                            text = newBreatheInfo.text
                            timer = Timer.publish(every: newBreatheInfo.time, on: .main, in: .common).autoconnect()
                        }
                    })
                Spacer()
                    .frame(height: 70.0)
                Image("Rocks")
                Spacer()
            }
            .padding()
            .opacity(opacity)
        }
        
        WaveShape(percent: 0.4, strength: 30, frequency: 7, phase: 0)
            .fill(.green)
            .offset(y: CGFloat(1) * 2)
            .opacity(oneTimeOpacity)
            .onAppear(perform: {
                withAnimation(baseAnimation) {
                    opacity = 1
                    oneTimeOpacity = 1
                }
            })
    }
    
}

