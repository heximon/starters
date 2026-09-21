import { defineHeximonConfig, DiagnosticCode } from "@heximon/build";
import { HttpPlugin } from "@heximon/http/compiler";

// The capability manifest: one compiler plugin per capability. The entire HTTP layer is the one plugin
// below; everything you add later (events, CQRS, queues, …) is one more entry in the same list.
export default defineHeximonConfig({
  plugins: [new HttpPlugin()],
  // Greenfield default: escalate the "compiles green but miswired" advisories to hard errors — a handler
  // listed nowhere, a typo'd namespace sub-key, a cross-module internal import.
  // Relax by removing a code. Moving one to `suppressDiagnostics` only works for a code the compiler marks
  // suppressible: an orphan concept and an unclaimed key are never silenceable (nothing would wire them, so
  // the build tells you rather than letting the entry sit there doing nothing), while a cross-module import
  // is — it resolves fine at runtime and loose module boundaries can be a deliberate choice.
  strictDiagnostics: [
    DiagnosticCode.OrphanConcept,
    DiagnosticCode.UnclaimedConceptKey,
    DiagnosticCode.CrossModuleInternalImport,
  ],
});
