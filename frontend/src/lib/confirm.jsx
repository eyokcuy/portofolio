import { toast } from "sonner";

/**
 * Shows a neobrutalism-style confirmation dialog using sonner.
 * Returns a promise that resolves to `true` if confirmed, `false` if cancelled.
 */
export function confirmAction({ title, description, confirmLabel = "Delete" }) {
  return new Promise((resolve) => {
    toast.custom(
      (t) => (
        <div
          style={{
            background: "#fff",
            border: "4px solid #000",
            padding: "20px",
            boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
            minWidth: "280px",
            fontFamily: "inherit",
          }}
        >
          <p
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "16px",
              marginBottom: "8px",
            }}
          >
            {title}
          </p>

          {description && (
            <p
              style={{
                fontWeight: 700,
                fontSize: "13px",
                opacity: 0.8,
                marginBottom: "16px",
              }}
            >
              {description}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                toast.dismiss(t);
                resolve(false);
              }}
              style={{
                padding: "8px 16px",
                border: "3px solid #000",
                background: "#fff",
                fontWeight: 900,
                textTransform: "uppercase",
                fontSize: "12px",
                cursor: "pointer",
                boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                toast.dismiss(t);
                resolve(true);
              }}
              style={{
                padding: "8px 16px",
                border: "3px solid #000",
                background: "#dc2626",
                color: "#fff",
                fontWeight: 900,
                textTransform: "uppercase",
                fontSize: "12px",
                cursor: "pointer",
                boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: Infinity,
      },
    );
  });
}
