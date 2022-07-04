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

Q: explanation of the incompleteness theorem
A: Plain English

Q: Who is Steven Jobs?
A: Plain English

Q: ${message}
A:`.trim()

    return prompt
}