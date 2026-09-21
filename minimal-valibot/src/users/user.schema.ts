import { SchemaObject } from "@heximon/schema";
import * as v from "valibot";

// A `SchemaObject` class is both a value (the validator wired into the route) and a type (the handler's
// parsed body), so it drops straight into a `{ body: … }` slot. A declared body that fails validation is
// rejected with an RFC 9457 `400` before the handler runs.
export class CreateUser extends SchemaObject({
  name: v.pipe(v.string(), v.minLength(1)),
}) {}
