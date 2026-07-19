// Extends Express's Request interface to include our custom `user` property.
// This is TypeScript module augmentation — the standard way to add properties
// to third-party types without modifying their source.
//
// Once this file exists, `req.user` is available in ALL route handlers
// without any type casting.

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "patient" | "doctor";
      };
    }
  }
}

// This empty export makes TypeScript treat this file as a module,
// which is required for global augmentation to work correctly.
export {};
