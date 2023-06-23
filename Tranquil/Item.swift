//
//  Item.swift
//  Tranquil
//
//  Created by Vaibhav Venkat on 6/22/23.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
