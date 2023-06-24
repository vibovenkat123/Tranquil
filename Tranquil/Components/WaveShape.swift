import SwiftUI

public struct WaveShape: Shape {
    var percent: Double
    
    var strength: Double
    var frequency: Double
    
    var phase: Double
    
    public init(
        percent: Double,
        strength: Double,
        frequency: Double,
        phase: Double
    
    ) {
        self.percent = percent
        self.strength = strength
        self.frequency = frequency
        self.phase = phase
    }
    
    public func path(in rect: CGRect) -> Path {
        var path = Path()
        let width = Double(rect.width)
        let height = Double(rect.height)
        let midWidth = width / 2
        let oneOverMidWidth = 1 / midWidth
        
        let wavelength = width / frequency
        
        path.move(to: CGPoint(x: 0, y: height))
        
        for x in stride(from: 0, through: width, by: 1) {
            let relativeX = x / wavelength
            
            let distanceFromMidWidth = x - midWidth
            
            let normalDistance = oneOverMidWidth * distanceFromMidWidth
            
            let parabola = -(normalDistance * normalDistance) + 1
            
            let sine = sin(relativeX + phase)
            
            let y = parabola * strength * sine + height * percent
            
            path.addLine(to: CGPoint(x: x, y: y))
        }
        
        path.addLine(to: CGPoint(x: rect.width, y: rect.height))
        path.addLine(to: CGPoint(x: 0, y: rect.height))
        path.closeSubpath()
        return path
    }
}
