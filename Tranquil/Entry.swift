import Foundation
import SwiftData



@Model
class Entry {
    @Attribute(.unique) var date: Date
    var content: String
    var adjective: String
    init(date: Date, content: String, adjective: String) {
        self.date = date
        self.content = content
        self.adjective = adjective
    }
}
