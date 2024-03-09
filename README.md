
# Novel Game Creator

A tool for creating interactive, text novels.

## Features

- Play interactive novels with different dialog choices
    - Storyline branching
    - Text animations and effects
    - Background music and sound effects
- Novel creation tool with live preview



## What is a novel?

A novel is a story that can be played. It's essentially a text file containg a syntax that can be interpreted by the application. This file uses the extension `.novel`.

```novel
TITLE "Alice's Adventures in Wonderland"
AUTHOR "Lewis Carroll"
ENTRY #dialog_block
PRELOAD "./background-music.wav" $bg-music
LOCK

#dialog_block
    [play $bg-music]

    @"Alice"
        But I don’t want to go among mad people.
    @

    @"Cat"
        Oh, you can’t help that,
        we’re all mad here. I’m mad.
        You’re mad.
    @

    @"Alice"
        How do you know I’m mad?
    @

    @"Cat"
        You must be,
        or you wouldn’t have come here.
    @
#
```

## Novel file syntax

### Header operators

Header operators are defined in the root of the file and are used to setup a novel. The syntax of a header operator is as following:
```novel
<OPERATOR> <arg1> <arg2> ...
```

Check all the [available header operators](#available-header-operators).

### Blocks

A block is a sequence of dialogs that can be referenced in the root level of the file, meaning you can't define a block inside another block. You can give a block any name, as long as it's unique and doesn't contain spaces. To define a block, use the following syntax:
```novel
#my_new_block
    
#

#my_other_block
    
#
```
To reference this block anywhere in the file, just use `#my_new_block`.

### Dialogs

A dialog is a sequence of texts that can only be defined inside blocks. It contains texts, which are separated by lines. Texts will appear one by one on screen until the whole dialog is displayed. You can add how many text lines you'd like, but dialogs must have at least one text. Dialogs can also be assigned a name that will show on screen if assigned. To define a dialog use the following syntax:
```novel
#my_block
    
    @"My dialog"
        This text will show first.
        This text will show last.
    @

#
```
If you don't want to assigned a name to it, you can just do as following:
```novel
#my_block
    
    @
        Sample text.
        Another text.
    @

#
```
If there is multiple dialogs inside a block, they will show one after the other on the screens, meaning you'll never see two dialogs simultaneously.
```novel
#my_block
    
    @"Person 1"
        Hey!
        How are you?
    @

    @"Person 2"
        Oh, hi!
        I'm fine. Thanks!
    @

#
```

### Commands

Commands can be placed inside blocks or dialogs. They need to be the only thing on the line in order to work. The syntax of a command is as following:
```novel
[<command> <arg1> <arg2> ...]
```
Check all the [available commands](#available-commands).

### Clickable texts

Clickable texts are texts that execute a command when clicked. Just like texts, a clickable text can only exist inside a dialog. To create a clickable text, use the following syntax:
```novel
{TEXT GOES HERE} [<command> ...]
```
For example:
```novel
#question
    @"Friend"
        Hey, regarding tonight...
        What do you want for dinner?
        {Hamburgers} [goto #scenario1]
        {Pizza} [goto #scenario2]
        {Anything is fine} [goto #scenario3]
    @
#

#scenario1
    @
        You eat hamburger.
    @
#

#scenario2
    @
        You eat pizza.
    @
#

#scenario3
    @
        You two couldn't decide so you don't eat anything.
    @
#
```
## Documentation

Here is described every header operator and command, as well as their use with examples.

### Available header operators

#### TITLE
```novel
TITLE "My Novel"
```
| Operator  | Arguments | Description       |
| :-------- | :-------- | :---------------  |
| `TITLE`   | `string`  | Sets the title    |

#### AUTHOR
```novel
AUTHOR "My name"
```
| Operator  | Arguments | Description       |
| :-------- | :-------- | :---------------- |
| `AUTHOR`  | `string`  | Sets the author   |

#### ENTRY
```novel
ENTRY #my_block
```
| Operator  | Arguments | Description                                                               |
| :-------- | :-------- | :-------------------------                                                |
| `ENTRY`   | `block`   | Defines the entry point of the novel, meaning the first block to show up  |

#### PRELOAD
```novel
PRELOAD "./image.jpeg" $my_variable
```
| Operator  | Arguments          | Description                                          |
| :-------- | :----------------  | :-------------------------                           |
| `PRELOAD` | `string, variable` | Preloads a resource and saves it on a new variable   |

#### LOCK
```novel
LOCK
```
| Operator  | Arguments | Description                        |
| :-------- | :-------  | :-------------------------         |
| `LOCK`    |           | Locks a novel making it readonly   |

### Available commands

#### `[goto <target>]`
Goes immediatly to a block.
| Argument  | Type       | Required  | Description      |
| :-------- | :--------  | :-------- | :--------------- |
| `target`  | `block`    | &#x2611;  | Block to go to   |

Example:
```novel
#block1
    @
        This text is inside a block
    @
    [goto #block2]
#

#block2
    @
        This text is inside another block
    @
#
```

#### `[play <audio> <transition>]`
Plays the audio from a variable. The variable **must** have an audio assigned first using the [PRELOAD](#preload) operator.
| Argument      | Type       | Required  | Description                                  |
| :--------     | :--------  | :-------- | :---------------                             |
| `audio`       | `variable` | &#x2611;  | Variable containing the audio to be played   |
| `transition`  | `number`   | &#x2612;  | Transition in seconds. Default is 0          |

Example:
```novel
PRELOAD "./roaaaarrr.wav" $my_audio

#jumpscare
    @
        When suddenly...
        [play $my_audio 0.5]
        A monster appears!
    @
#
```

#### `[stop <audio> <transition>]`
Stops an audio.
| Argument      | Type       | Required  | Description                                  |
| :--------     | :--------  | :-------- | :---------------                             |
| `audio`       | `variable` | &#x2611;  | Variable containing the audio to be stoped   |
| `transition`  | `number`   | &#x2612;  | Transition in seconds. Default is 0          |

Example:
```novel
PRELOAD "./calm-song.wav" $my_song

#my_block
    @
        You're walking back home
        You place your hand in your pocket and...
        [stop $my_song 3]
        YOU DON'T FEEL YOUR PHONE!
    @
#
```
