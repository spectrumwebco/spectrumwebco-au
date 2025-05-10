# Studio

Studio is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS 4.0](https://tailwindcss.com), [React 19](https://react.dev), and [Rsbuild](https://rsbuild.dev).

## Getting started

This project uses [Bun](https://bun.sh) as the package manager. If you don't have Bun installed, you can install it by following the instructions on the [Bun website](https://bun.sh/docs/installation).

### Installation

To get started with this template, first install the dependencies:

```bash
bun install
```

### Database Setup

This project uses TimescaleDB (a PostgreSQL extension) for data storage. You'll need to set up a TimescaleDB instance before running the application.

1. Create a `.env` file based on the `.env.example` template:

```bash
cp .env.example .env
```

2. Update the database connection details in the `.env` file to match your TimescaleDB instance.

3. Initialize the database schema:

```bash
bun run db:init
```

### Running the Application

Run the frontend development server:

```bash
bun run dev
```

Run the backend API server:

```bash
bun run server
```

For development with auto-restart on file changes:

```bash
bun run server:dev
```

You can also run Storybook to view and develop components in isolation:

```bash
bun run storybook
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website. The API server runs on [http://localhost:3001](http://localhost:3001) by default.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## TimescaleDB Integration

This project uses [TimescaleDB](https://www.timescale.com/) for database functionality. TimescaleDB is an open-source database built on PostgreSQL that provides time-series data capabilities while maintaining full SQL compatibility.

### Features

- **Contact Form Submissions**: The contact form on the website stores submissions in TimescaleDB, allowing you to track and manage customer inquiries over time.
- **User Authentication**: User accounts and sessions are stored in TimescaleDB, providing secure authentication for admin users.
- **Time-Series Analytics**: TimescaleDB's time-series capabilities allow for efficient storage and querying of time-based data, such as website analytics and user activity.

### Database Structure

The database includes the following tables:

- `users`: Stores user account information for authentication
- `sessions`: Manages user authentication sessions
- `contact_submissions`: Stores contact form submissions
- `page_views`: Tracks website analytics data

These tables are configured as TimescaleDB hypertables where appropriate, optimizing them for time-series data storage and querying.

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [React](https://react.dev/learn) - the official React documentation
- [Rsbuild](https://rsbuild.dev/guide/start/introduction) - the official Rsbuild documentation
- [Bun](https://bun.sh/docs) - the official Bun documentation
- [Storybook](https://storybook.js.org/docs) - the official Storybook documentation
- [TimescaleDB](https://docs.timescale.com/) - the official TimescaleDB documentation
- [Express](https://expressjs.com/) - the official Express documentation
- [PostgreSQL](https://www.postgresql.org/docs/) - the official PostgreSQL documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation
- [TypeScript](https://www.typescriptlang.org/docs/) - the official TypeScript documentation
