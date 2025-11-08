# ContainerCode

A Real-Time Multi-Language Code Execution Platform that runs Python and Node.js code securely inside lightweight container sandboxes using Podman. It supports real-time output streaming, a clean user interface, and isolated container-based execution.

---

## Features

- **Real-time Code Execution** – Python 3.11 and Node.js 20 support
- **Secure Containerized Runtime** – Using Podman for isolation
- **Monaco Editor** – VS Code-like interface for code editing
- **Modular Architecture** – Easy to add more programming languages
- **Lightweight Alpine-based Images** – Fast and efficient containers
- **Sandboxed Execution** – Complete isolation for security
- **Cross-platform Compatible** – Works on Windows, macOS, and Linux
- **Real-time Output Streaming** – See execution results instantly

---

## Tech Stack Overview

### Frontend
- **React 18** – UI framework
- **@monaco-editor/react** – Integrated code editor
- **Axios** – For API communication
- **Socket.io-client** – For real-time updates
- **TailwindCSS** – For layout and design

### Backend (API Server)
- **Node.js 20** – Runtime environment
- **Express.js 4.18** – Backend framework
- **Socket.io 4.6** – Real-time WebSocket communication
- **UUID** – Unique execution ID generation
- **dotenv and cors** – Configuration and CORS management

### Containerization
- **Podman 5.0+** – Docker-compatible container engine
- **Python:3.11-alpine** – Lightweight Python runtime
- **Node:20-alpine** – Lightweight Node.js runtime
- Custom Containerfiles for secure, isolated environments

### Data and Storage
- Temporary execution directories (auto-cleaned)
- Uses system-level temporary storage (no persistence)
- Fully ephemeral containers for sandboxed execution

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20 or higher
- **npm** (comes with Node.js)
- **Podman** v5.0 or higher
- **Git** (for cloning the repository)
- **VS Code** (recommended for development)

---

## Installation and Setup

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/unik1104/containercode.git
cd containercode
```

#### 2. Setup Backend

```bash
cd api
npm install
```

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

#### 4. Build Runtime Containers

**Python Runtime:**
```bash
cd ../runtimes/python
podman build -t python:3.11-alpine .
```

**Node.js Runtime:**
```bash
cd ../nodejs
podman build -t node:20-alpine .
```

#### 5. Start Backend Server

```bash
cd ../../api
npm run dev
```

The server will start at: **http://localhost:3001**

#### 6. Start Frontend (in a new terminal)

```bash
cd ../frontend
npm start
```

Open your browser and visit: **http://localhost:3000**

---

## How It Works

1. The frontend allows users to write code in **Python** or **Node.js**.
2. On clicking **"Execute"**, the code is sent to the backend API.
3. The backend creates a temporary **Podman container** based on the selected language.
4. The code executes securely within that container.
5. The output is **streamed back** to the frontend in real-time.
6. After execution, the temporary container and files are **deleted automatically**.

---

## Example Code

### Python Example

```python
for i in range(5):
    print(f"Number: {i}")
```

### Node.js Example

```javascript
for (let i = 0; i < 5; i++) {
  console.log(`Number: ${i}`);
}
```

---

## Container Usage

### Build Images

**Python Runtime:**
```bash
cd runtimes/python
podman build -t unik1104/containercode-python:1.0 .
```

**Node.js Runtime:**
```bash
cd ../nodejs
podman build -t unik1104/containercode-node:1.0 .
```

### Login to Docker Hub

```bash
podman login docker.io
```

(Use your Docker Hub username and access token.)

### Push Images

```bash
podman push docker.io/unik1104/containercode-python:1.0
podman push docker.io/unik1104/containercode-node:1.0
```

### Pull Images (for verification)

```bash
podman pull docker.io/unik1104/containercode-python:1.0
podman pull docker.io/unik1104/containercode-node:1.0
```

---

## Repository and Registry Links

### GitHub Repository
All source code, Containerfiles, and documentation are publicly available:

🔗 **https://github.com/unik1104/containercode**

### Docker Hub Registry
Container images for both runtimes are publicly accessible:

- **Python Runtime Image:** https://hub.docker.com/r/unik1104/containercode-python
- **Node.js Runtime Image:** https://hub.docker.com/r/unik1104/containercode-node

---

## Project Structure

```
containercode/
├── api/                    # Backend API server
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/              # React frontend application
│   ├── src/
│   ├── package.json
│   └── ...
└── runtimes/              # Container runtime definitions
    ├── python/            # Python 3.11 Alpine container
    │   └── Containerfile
    └── nodejs/            # Node.js 20 Alpine container
        └── Containerfile
```

---

## Troubleshooting

### Podman Issues

If you encounter Podman-related errors:

1. **Ensure Podman is running:**
   ```bash
   podman info
   ```

2. **Verify container images are built:**
   ```bash
   podman images
   ```

3. **Check Podman socket permissions:**
   ```bash
   ls -l /run/podman/podman.sock
   ```

### Port Conflicts

If ports 3000 or 3001 are already in use:
- **Frontend:** Modify the PORT in `frontend/package.json`
- **Backend:** Update the PORT in `api/.env`

---

## Future Enhancements

- [ ] Add **Java, C++, and Go** language containers
- [ ] Store code execution history using **PostgreSQL**
- [ ] Add **authentication and user profiles**
- [ ] Support **file uploads** for larger projects
- [ ] Integrate **AI-assisted code suggestions**

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For issues, questions, or contributions, please open an issue on the [GitHub repository](https://github.com/unik1104/containercode/issues).

---

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Uses [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Powered by [Podman](https://podman.io/)
- Backend built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/)
- Real-time communication via [Socket.io](https://socket.io/)

---
