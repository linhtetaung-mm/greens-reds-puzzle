# 🟢🔴 Greens & Reds (Linear Algebra Puzzle & GF(2) Solver)

An advanced web implementation of the classic grid-toggling puzzle (often known as *Lights Out*). This project features a highly interactive UI built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Vite** that challenges users to match state configurations while providing an instant, automated algebraic solver.

---

## 🧮 Mathematical Engine Architecture

Unlike brute-force or standard backtracking games, **Greens & Reds** is powered by pure discrete mathematics and linear algebra. The solver treats the entire game board as a high-dimensional vector space.

### 1. Matrix Modeling
The grid is calculated as a system of linear equations operating entirely within **Galois Field 2 (GF(2))**. In this field, values are restricted strictly to bits (`0` and `1`), and addition is executed using the CPU's native, hardware-accelerated **XOR** operator.
*   **State Vector ($\mathbf{b}$):** A vector representing the board's current red/green configuration.
*   **Strategy Vector ($\mathbf{x}$):** The unknown sequence of button presses needed to achieve the target state.
*   **Adjacency Matrix ($A$):** A constant transformation matrix mapping the custom rule set of button interactions.

### 2. The Core Equation
The automated calculator finds a precise solution vector $\mathbf{x}$ such that:
$$A\mathbf{x} = \mathbf{b}$$

### 3. Execution Pipeline: Gaussian Elimination
The mathematical solver processes the board by running **Gaussian Elimination** on an augmented matrix $[A | \mathbf{b}]$:
1.  **Pivoting**: Finds and swaps rows to establish a clean diagonal of active bits.
2.  **XOR Forward Elimination**: Eliminates column conflicts natively using bitwise operators (`^=`).
3.  **RREF Transformation**: Brings the matrix into Reduced Row Echelon Form, instantly isolating the **Identity Matrix** and revealing the target strategy vector.
4.  **Runtime Profile**: Features an execution time complexity of $O(N^3)$. For a standard matrix setup, calculations finish in **sub-millisecond times**, running completely lag-free in the browser's main render loop.

---

## 🚀 Application Design Features

*   **🎮 Interactive Gameplay Layer**: Toggle pieces dynamically using highly optimized event configurations.
*   **🤖 Matrix Lab Solver**: Tap a button to run the Galois Field equation engine and visually display the exact keys required to win.
*   **💾 State-Preserving Tab Layout**: Employs smart styling toggles (`hidden`) instead of conditional component unmounting. Users can hop back and forth between active play sessions and the math sandbox without losing structural board array states.
*   **📱 Universal Touch Optimization**: Full fluid typography and spacing adjustments built natively with Tailwind CSS v4, perfectly tailoring the experience for mobile screens and desktop monitors alike.

---

## 💻 Local Workspace Initialization

Follow these quick commands to spin up the code sandbox on your local developer workstation:

### 1. Clone the Codebase
```bash
git clone https://github.com
cd YOUR_REPO_NAME
```

### 2. Install Project Modules
This workspace relies on strict dependency tracking via `pnpm` to optimize disk storage footprint:
```bash
pnpm install
```

### 3. Launch the Local Dev Server
Initialize the Vite HMR build engine:
```bash
pnpm dev
```
Open your preferred browser viewport and steer it to the active console terminal address output (usually `http://localhost:5173`).

---

## 📦 Production Bundling Execution

To compile, minify, and compress your puzzle game workspace codebase into a highly-optimized static collection ready for free web hosting nodes (like GitHub Pages, Netlify, or Vercel), execute:

```bash
pnpm build
```
The asset builder will write static production files directly into a self-contained root folder named `/dist`.

---

## 📄 License
This application setup is completely open-source and free to share, modify, or adapt for your own game mechanics. Enjoy codebreaking!
