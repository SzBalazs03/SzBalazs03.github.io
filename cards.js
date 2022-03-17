class bootStrapCard {
    constructor(card, title, text) {
        this.card = card
        this.title = title
        this.text = text


        this.changeData = function(title, text) {
            if (title != undefined) {
                this.title = title
            }
    
            if (text != undefined) {
                this.text = text
            }
    
            this.init()
        }        
    }

    init() {
        var cNodes = this.card.childNodes
        for (var i = 0; i < cNodes.length; i++) {
            if (cNodes[i].className == "card-title") {
                cNodes[i].innerText = this.title
            }

            if (cNodes[i].className == "card-text") {
                cNodes[i].innerText = this.text
            }
        }
    }

   
}
