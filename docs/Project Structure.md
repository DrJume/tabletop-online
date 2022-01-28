# Project Structure

```tree
.
├── .vscode/                               # Workspace specific configuration files
├── backend/                               # All Backend logic
│   └── index.ts        
├── docs/                                  
│   ├── assets/                            # Contains diagrams for documentation
│   └── reviews/                           # Review of an older version of this project
├── public/
│   ├── assets/                            # Contains dynamic game assets (used at runtime) (Boards)
├── src/
│   ├── assets/                            # Contains static game assets (Pawn, Dice)
│   ├── components/
│   │   ├── InGame/                        # Components that are used exclusively for playing
│   │   │   ├── Dice/                      
│   │   │   ├── LogBar/
│   │   │   ├── Sidebar/                   # Contains sidebar and its sections
│   │   │   └── Tabletop/                  # Components of playing area 
│   │   │       └── GameComponents/        
│   │   │           ├── PlayingBoard.vue   
│   │   │           ├── PlayingCard.vue    # Initial Playing Card
│   │   │           └── PlayingObject.vue  # Playing Pawn
│   │   └── UI/                            
│   │       ├── TabletopButton.vue         # Basic floating buttons
│   │       ├── TabletopModal.vue          # Start dialog (user picks name and color)
│   │       ├── TabletopNotification.vue   # Notifications that appear in top-right corner
│   │       └── TabletopSidebar.vue        # Basic sidebar
│   ├── modules/                           # Contains functionality that is used more than once
│   │   ├── useShareDB.ts                  # Interface for ShareDB document
│   │   ├── useSocketIO.ts                 # Interface for Socket.io communication
│   │   ├── useTabletopDraggable.ts        # Logic for draggable game object
│   │   └── useTabletopSocket.ts           # Communication Logic with Socket.io
│   ├── routes/                            # Contains all paths of the application
│   ├── stores/                            # Reactive Pinia stores
│   │   ├── session.ts                     # Local user-specific store
│   │   └── tabletop.ts                    # Global store
│   ├── types/                             # TS types
│   ├── util/                              # Small helper functions
│   ├── views/                             
│   │   ├── InGame.vue                     # Application view during game
│   ├── App.vue
│   └── main.ts                            # Equivalent of main.js in TS
├── package.json                           # Contains all dependencies for app
├── README.md
├── TODO.todo                              # Current project todos
```
