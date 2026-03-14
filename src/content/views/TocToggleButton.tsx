interface TocToggleButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function TocToggleButton({
  collapsed,
  onToggle,
}: TocToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        top: "80px",
        right: "1em",
        zIndex: 1000,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        padding: "2px 8px",
        color: "#666",
      }}
      title={collapsed ? "目次を表示" : "目次を非表示"}
    >
      {collapsed ? "目次▼" : "✕"}
    </button>
  );
}
