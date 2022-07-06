export function classifyPrompt(message: string): string {
    const prompt = `
====
Classify questions into one of two categories:
1. Code Example
2. Plain English
3. Both
====

Q: for loop in python
A: Code Example

Q: Example of Vector class
A: Code Example

Q: What is incompleteness?
A: Plain English

Q: What is the builder pattern?
A: Plain English

Q: Example of builder pattern
A: Code Example

Q: binary search in C#?
A: Code Example

Q: What is binary search
A: Plain English

Q: explain incompleteness theorem
A: Plain English

Q: What are for loops?
A: Plain English

Q: What are for loops with example?
A: Both

Q: explain to me how I could represent a chess board in programming?
A: Plain English

Q: explain to me how I could represent a chess board in programming w/ ex?
A: Both

Q: what is a function
A: Plain English

Q: What is a function w/ ex
A: Both

Q: ${message}
A:`.trim()

    return prompt
}

export function plainEnglishPrompt(message: string): string {
    const prompt = `
====
Give detailed answers to questions. Answers can span multiple paragraphs.
===

Q: What is the Incompleteness theorem and who found it
A: The incompleteness theorem is a theorem in mathematical logic that states that any effectively generated theory capable of expressing elementary arithmetic cannot be both consistent and complete. In other words, for any consistent, effectively generated formal theory that proves certain basic arithmetic truths, there is an arithmetical statement that is true, but not provable in the theory. The theorem was proven by Kurt Gödel in 1931.

Q: What is general relativity?
A: General relativity is a theory of gravity that was developed by Albert Einstein in the early 20th century. It is the most accurate theory of gravity that we have, and it explains the phenomena of gravity in a way that is consistent with the other laws of physics. General relativity is a theory of spacetime, which is the 4-dimensional continuum that includes both space and time. In general relativity, gravity is not a force between masses. Instead, it is a curvature of spacetime caused by the presence of mass and energy. The more mass and energy there is in a given region of spacetime, the more that region will be curved. This curvature of spacetime causes objects to move in the way that we experience as gravity. For example, the Earth orbits the Sun because the Sun bends the spacetime around it, and the Earth follows the resulting curved path.

Q: What is the builder pattern?
A: The builder pattern is a design pattern that is used to create complex objects with a lot of configuration options. The builder pattern is a flexible alternative to the factory pattern, and it allows for the construction of objects to be customized without having to create a new subclass for each different configuration. The builder pattern is often used in conjunction with the composite pattern, which allows for the construction of objects that are made up of other objects.

Q: ${message}
A:`.trim()

    return prompt
}

export function codeExamplePrompt(message: string): string {
    const prompt = `
====
Give code examples to questions using markdown. Avoid using comments in code.
====

Q: for loop in python
A: \`\`\`py
letters = [ 'a', 'b', 'c',]
for letter in letters:
    print(letter)
\`\`\`

Q:fractal tree in python using turtle
A: \`\`\`py
import turtle

def draw_branch(t, branch_length):
    if branch_length > 5:
        t.forward(branch_length)
        t.right(20)
        draw_branch(t, branch_length-15)
        t.left(40)
        draw_branch(t, branch_length-15)
        t.right(20)
        t.backward(branch_length)

def main():
    window = turtle.Screen()
    window.bgcolor('white')
    t = turtle.Turtle()
    t.left(90)
    t.color('green')
    t.speed(0)
    draw_branch(t, 100)
    window.exitonclick()

main()
\`\`\`

Q: ${message}
A:`.trim()

    return prompt
}

export function bothPrompt(message: string): string {
    const prompt = `
====
Give detailed answers to questions and include code examples when sensible.
Users might ask for a single example, multiple examples, or paradigm specific examples.
====

Q: How I could represent a chess board in programming?
A: One way would be to use a two-dimensional 8x8 array, with the first dimension representing the rank (row) and the second dimension representing the file (column). The elements in the array can be either 0 or 1, with 0 representing an empty square and 1 representing a square that is occupied by a piece.
\`\`\`py
chess_board = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
]
\`\`\`

Q: What are some ways I could represent a chess board in programming?
A: One way would be to use a two-dimensional 8x8 array, with the first dimension representing the rank (row) and the second dimension representing the file (column). The elements in the array can be either 0 or 1, with 0 representing an empty square and 1 representing a square that is occupied by a piece.
\`\`\`py
chess_board = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
]
\`\`\`
{this example should use array of strings, like ["a1", "a2"],
Another way would be to use a one-dimensional array of 64 elements, with each element being a string that contains both the rank and file of the square.
\`\`\`py
chess_board = [
    "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
    "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
    "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
    "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8",
    "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
    "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
    "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"
]
\`\`\`

Q: How could I represent a chess board in programming using OOP?
A: One way would be to create a class called \`ChessBoard\` that has a two-dimensional 8x8 array as an attribute. The class would also have methods to move pieces, check if a move is valid, and check if a player is in check.
\`\`\`py
class ChessBoard:
    def __init__(self):
        self.board = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ]

    def move_piece(self, start_pos, end_pos):
        # move piece from start_pos to end_pos
        # check if move is valid
        # check if player is in check
        pass

    def is_valid_move(self, start_pos, end_pos):
        # check if move is valid
        pass

    def is_in_check(self, player):
        # check if player is in check
        pass
\`\`\`

Q: what are for loops w/ ex
A: For loops are used to iterate over a sequence of elements.
\`\`\`py
for i in range(10):
    print(i)
\`\`\`
This will print the numbers 0 through 9.

\`\`\`py
letters = ['a','b','c']
for letter in letters:
    print(letter)
\`\`\`
This will print the letters 'a', 'b', and 'c'.

Q: What is dependency injection w/ example?
A: Dependency injection is a design pattern that allows you to inject dependencies into a class.
\`\`\`py
class Car:
    def __init__(self, engine):
        self.engine = engine

class Engine:
    def __init__(self):
        self.cylinders = 4

engine = Engine()
car = Car(engine)
\`\`\`
In this example, the \`Car\` class has a dependency on the \`Engine\` class. The \`Engine\` class is injected into the \`Car\` class through the \`__init__\` method.

Q: How do Inversify containers work?
A: Inversify is a dependency injection container for TypeScript and JavaScript.
\`\`\`ts
import { Container } from "inversify";
import { Car } from "./car";
import { Engine } from "./engine";

const container = new Container();
container.bind<Engine>("Engine").to(Engine);
container.bind<Car>("Car").to(Car);

const car = container.get<Car>("Car");
\`\`\`
In this example, the \`Container\` class is used to create the \`Engine\` and \`Car\` objects and inject the \`Engine\` object into the \`Car\` object.

Q: ${message}
A:`.trim()

    return prompt
}