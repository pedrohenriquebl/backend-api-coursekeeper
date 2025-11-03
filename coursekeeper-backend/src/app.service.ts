import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const frontendUrl = 'https://frontend-coursekeeper.vercel.app/';
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>CourseKeeper Backend</title>
        <style>
          body {
            background-color: #121212;
            color: #f0f0f0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            color: #4ade80;
            font-size: 2.5rem;
          }
          a {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: background-color 0.3s;
          }
          a:hover {
            background-color: #1e40af;
          }
        </style>
      </head>
      <body>
        <h1>🚀 Backend is running!</h1>
        <p>You can access the frontend here:</p>
        <a href="${frontendUrl}" target="_blank">CourseKeeper Frontend</a>
      </body>
      </html>
    `;
  }
}
