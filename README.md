# ContainerCode

Real-Time Multi-Language Code Execution Platform

## Quick Start

### Prerequisites
- Node.js 20+
- Podman 5.0+

### Installation

1. **Setup Backend:**
```bash
cd api
npm install
```

2. **Setup Frontend:**
```bash
cd frontend
npm install
```

3. **Build Container Images:**
```bash
cd runtimes/python
podman build -t python:3.11-alpine .

cd ../nodejs
podman build -t node:20-alpine .
```

4. **Start Backend:**
```bash
cd api
npm run dev
```

5. **Start Frontend (new terminal):**
```bash
cd frontend
npm start
```

6. **Open Browser:**
http://localhost:3000

## Features
- Python 3.11 execution
- Node.js 20 execution
- Real-time output streaming
- Secure containerized execution
- Monaco code editor