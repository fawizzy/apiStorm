---

# apiStorm

apiStorm is a simple Node.js tool for load testing HTTP and HTTPS endpoints. It allows you to simulate multiple concurrent requests to a given URL and provides insights into server performance.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Command-Line Options](#command-line-options)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Load testing for both HTTP and HTTPS endpoints.
- Configurable number of total requests and concurrent requests.
- Provides server information and response analysis.
- Easy-to-use command-line interface.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fawizzy/apiStorm.git
   ```

2. Navigate to the project directory:

   ```bash
   cd apiStorm
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Run the tool using the following command:

```bash
node apistorm.js -u <url> -n <total-requests> -c <concurrent-requests>
```

## Demo

Check out the [live demo](https://www.awesomescreenshot.com/video/24025264?key=7dc882695ecabd4992283d9fd13bb64b) to see apiStorm in action

### Command-Line Options

- `-u`: The URL to test (required).
- `-n`: Total number of requests (default is 1).
- `-c`: Number of concurrent requests (default is 1).

## Example

```bash
node apistorm.js -u https://example.com/api -n 100 -c 10
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.


---
