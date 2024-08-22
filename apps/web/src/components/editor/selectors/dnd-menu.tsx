import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const MyContextMenu = () => {
  const handleItemClick = (action) => {
    console.log(`Clicked on ${action}`);
    // Add your action handling logic here
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="drag-handle"
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#f0f0f0",
            cursor: "grab",
          }}
        >
          Drag Me
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => handleItemClick("Action 1")}>
          Action 1
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleItemClick("Action 2")}>
          Action 2
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleItemClick("Action 3")}>
          Action 3
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MyContextMenu;
