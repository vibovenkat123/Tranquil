//
//  Globals.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/26/23.
//

import Foundation
import SwiftUI

struct Globals {
    let accentColor = Color.primary
    let primaryColor = Color.primary
    let offPrimary = UIColor.systemGray6
    let cornerRadius: CGFloat = CGFloat(20)
    let font = CreateFont()
}

func CreateFont( _ type: Font? = Font.body, size: CGFloat? = 17 ) -> Font {
    var size = size
    if let type {
        switch type {
        case .title:
           size = 28
        case .body:
            size = 17
        case .largeTitle:
            size = 34
        case .title2:
            size = 22
        case .title3:
            size = 20
        case .subheadline:
            size = 15
        case .callout:
            size = 16
        case .footnote:
            size = 13
        case .caption:
            size = 12
        case .caption2:
            size = 11
        default:
            size = 17
        }
    }
    return Font.custom("Avenir Next", size: size!)
}
