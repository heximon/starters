import { SchemaObject } from "@heximon/schema";
import { z } from "zod";

// A `SchemaObject` class is both a value (the validator wired into the route) and a type (the handler's
// parsed body), so it drops straight into a `{ body: … }` slot. A declared body that fails validation is
// rejected with an RFC 9457 `400` before the handler runs.
export class CreateUser extends SchemaObject({
  name: z.string().min(1),
}) {}
