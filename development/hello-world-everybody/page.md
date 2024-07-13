---
title: "Hello World Everybody"
subtitle: "Learn how to code with Go." 
excerpt: "Golang, also known as Go, is a statically typed, compiled programming language designed by Google. Let's start with the basics by creating a simple "Hello World" program."
cover: "/assets/development/hello-world-everybody/code-implementation.jpg"
date: "2023-03-15T14:22:35.123Z"
---

![Woman in tech](code-implementation.jpg)

Golang, also known as Go, is a statically typed, compiled programming language designed by Google. Let's start with the basics by creating a simple "Hello World" program.

## Prerequisites

Before we begin, make sure you have Go installed on your system. You can download it from [the official Go website](https://golang.org/dl/).

## Step-by-Step Guide

### Step 1: Create a New Go File

First, create a new file with the `.go` extension. For this example, we'll name it `main.go`.

```bash
touch main.go
```

### Step 2: Write the Go Code

Open `main.go` in your favorite text editor and add the following code:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

### Step 3: Run the Go Program

To run your Go program, open a terminal and navigate to the directory where your `main.go` file is located. Then, execute the following command:

```bash
go run main.go
```

You should see the following output:

```plaintext
Hello, World!
```

## Understanding the Code

Let's break down the code to understand what's happening:

1. **Package Declaration**: The `package main` line declares that this file belongs to the `main` package. The `main` package is a special package in Go that indicates an executable program.
2. **Import Statement**: The `import "fmt"` line imports the `fmt` package, which contains functions for formatting and printing text to the console.
3. **Main Function**: The `func main()` line declares the `main` function. In Go, the `main` function is the entry point of the program. When you run the program, the code inside this function is executed.
4. **Print Statement**: The `fmt.Println("Hello, World!")` line calls the `Println` function from the `fmt` package to print the string "Hello, World!" to the console.

## Conclusion

Congratulations! You've successfully created and run your first Go program. From here, you can explore more features of the language and start building more complex applications.

Happy coding!