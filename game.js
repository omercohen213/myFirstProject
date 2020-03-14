const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

// starts the game with the first textNode
function startGame() {
  state = {}
  showTextNode(1)
}
//deletes every option in the textnode index that was passed
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  
    textNode.options.forEach(option => {
    if (showOption(option))
    {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}
// shows only the options that dont require state or options with the required state
function showOption(option) {
 return ((option.requiredState == null || option.requiredState(state)))
}

// shows the next textNode by its id
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  
  const optionText = option.text
  //state as string to add more(?) (how does it save)
  //how to show the same textNode and removing one option while keeping the state?
  
  state = Object.assign(state, option.setState)
  showAgain = option.setShowAgain

  //deletes every option with property of (showAgain:false)
  if (!showAgain){
    for(let i=0; i<textNodes.length; i++)
       for(j=0; j<textNodes[i].options.length; j++){
          optionToDel= textNodes.find(textNode => textNodes[i].options[j].setShowAgain === false)
             if (optionToDel)
                 delete textNodes[i].options[j]} 
  }  
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see a jar of blue goo near you.',
    options: [
      { 
        setShowAgain: true,
        text: 'Take the goo',
        setState: { blueGoo: true },
        nextText: 2
        
      },
      { 
        text: 'take the key',
        setState:{ key: true},
        setShowAgain: false,
        nextText: 1
       
        
      },
      {
        text: 'Leave the goo',
        nextText: 2
      },
     {
        setShowAgain: true,
        text: 'open the door',
        addButton: true,
        nextText: 2,
        requiredState: (currentState) => currentState.key
       
      },
       ]},
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        setShowAgain: true,
        text: 'Trade the goo for a sword',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        setShowAgain: true,
        text: 'Trade the goo for a shield',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        setShowAgain: true,
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
    options: [
      {
        setShowAgain: true,
        text: 'Explore the castle',
        nextText: 4
      },
      {
        setShowAgain: true,
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        setShowAgain: true,
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        setShowAgain: true,
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        setShowAgain: true,
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  { 
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        setShowAgain: true,
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        setShowAgain: true,
        text: 'Try to run',
        nextText: 8
      },
      {
        setShowAgain: true,
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        setShowAgain: true,
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        setShowAgain: true,
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        setShowAgain: true,
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        setShowAgain: true,
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        setShowAgain: true,
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        setShowAgain: true,
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
