# HashKey Chain Documentation

This repository contains the official documentation for HashKey Chain. We welcome contributions from the community to help improve and expand our documentation.

## Contributing to the Documentation

We appreciate your interest in contributing to the HashKey Chain documentation. By following these guidelines, you can help us maintain high-quality, consistent documentation.

### Prerequisites

Before you start contributing, ensure you have:

- A GitHub account
- Git installed on your local machine
- Node.js (version 16 or higher) and npm installed
- Basic knowledge of Markdown and MDX

### Setting Up the Development Environment

1. Fork the repository to your GitHub account
2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/documentation.git
   cd documentation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the documentation.

### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the documentation. The content is organized as follows:
   - `/contents/docs/` - Main documentation content in MDX format
   - `/contents/blogs/` - Blog posts and announcements

3. Preview your changes locally by running the development server.

### Documentation Standards

- Use clear, concise language
- Follow the existing document structure and formatting
- Include code examples where appropriate
- Add descriptive links to reference materials
- Ensure your content is technically accurate

### Submitting a Pull Request

1. Commit your changes with a clear message:
   ```bash
   git commit -m "docs: improve explanation of network configuration"
   ```

2. Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Go to the [original repository](https://github.com/HashkeyHSK/documentation) and create a pull request.

4. In your pull request:
   - Provide a clear title and description
   - Reference any related issues
   - Explain what your changes accomplish

### Review Process

After submitting a pull request:

1. Maintainers will review your contribution
2. They may suggest changes or improvements
3. Once approved, your contribution will be merged
4. Your name will be added to the contributors list

## Local Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Deployment

The documentation is automatically deployed using Vercel when changes are merged to the main branch.

## License

This documentation is licensed under [LICENSE_TYPE]. See the LICENSE file for details.

---

Thank you for contributing to HashKey Chain documentation and helping make blockchain technology more accessible to everyone!
