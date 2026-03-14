import styled from "styled-components";

interface TocToggleButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Button = styled.button`
  position: fixed;
  top: 80px;
  right: 1em;
  z-index: 1000;
  background: white;
  &:hover {
    background: #f0f0f0;
  }
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
  color: #666;
`;

export default function TocToggleButton({
  collapsed,
  onToggle,
}: TocToggleButtonProps) {
  return (
    <Button
      onClick={onToggle}
      title={collapsed ? "目次を表示" : "目次を非表示"}
    >
      {collapsed ? "目次▼" : "✕"}
    </Button>
  );
}
