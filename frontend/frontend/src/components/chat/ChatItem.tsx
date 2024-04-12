
import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  const blocks: string[] = [];
  const lines = message.split("\n");
  let currentBlock = "";

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (currentBlock.trim()) {
        blocks.push(currentBlock.trim());
      }
      currentBlock = "";
    } else {
      currentBlock += line + "\n";
    }
  }

  if (currentBlock.trim()) {
    blocks.push(currentBlock.trim());
  }

  return blocks;
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  const messageBlocks = extractCodeFromString(content);

  return (
    <Box sx={{ display: "flex", p: 2, gap: 2, borderRadius: 2, my: 1, bgcolor: role === "assistant" ? "#004d5612" : "#004d56" }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks ? (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={index} style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block}
              </Typography>
            )
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
