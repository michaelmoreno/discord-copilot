export function classifyPrompt(message: string): string {
    const prompt = `
====
Classify questions into one of two categories:
1. Code Example
2. Plain English
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

Q: explain to me how I could represent a chess board in programming?
A: Plain English

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
