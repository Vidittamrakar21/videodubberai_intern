import { useState, useRef } from "react";
import { Button, Group, Text, AppShell, Center } from "@mantine/core";

export default function IndexPage() {
  const [content, setContent] = useState(""); 
  const textRef = useRef(null);



  const foregroundColors = [
    { code: "30", label: "Gray", color: "#4F545C" },
    { code: "31", label: "Red", color: "#DC322F" },
    { code: "32", label: "Green", color: "#859900" },
    { code: "33", label: "Gold", color: "#B58900" },
    { code: "34", label: "Blue", color: "#268BD2" },
    { code: "35", label: "Pink", color: "#D33682" },
    { code: "36", label: "Teal", color: "#2AA198" },
    { code: "37", label: "White", color: "#FFFFFF" },
  ];
  
  const backgroundColors = [
    { code: "40", label: "Dark Blue", color: "#002B36" },
    { code: "41", label: "Orange", color: "#CB4B16" },
    { code: "42", label: "Dark Gray", color: "#586E75" },
    { code: "43", label: "Gray", color: "#657B83" },
    { code: "44", label: "Light Gray", color: "#839496" },
    { code: "45", label: "Purple", color: "#6C71C4" },
    { code: "46", label: "Cyan", color: "#93A1A1" },
    { code: "47", label: "Cream", color: "#FDF6E3" },
  ];
  


  const applyColorToSelection = (color:string) => {

    const selection = window.getSelection();
    //@ts-ignore
    if (!selection.rangeCount) return;

    //@ts-ignore
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.color = color;
    span.textContent = range.toString();
    range.deleteContents();
    range.insertNode(span);
    //@ts-ignore
    setContent(textRef.current.innerHTML); 
  };

  const applyColorToSelection2 = (color:string) => {

    const selection = window.getSelection();
    //@ts-ignore
    if (!selection.rangeCount) return;

    //@ts-ignore
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    span.textContent = range.toString();
    range.deleteContents();
    range.insertNode(span);
    //@ts-ignore
    setContent(textRef.current.innerHTML); 
  };


  const copyAsDiscordFormat = () => {

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const textNodes = tempDiv.querySelectorAll("span");

    let discordFormattedText = content;
    textNodes.forEach((node) => {
      const discordColor = node.style.color|| "default";
      const formattedText = `\`\`\`${discordColor}\n${node.textContent}\n\`\`\``;
      discordFormattedText = discordFormattedText.replace(node.outerHTML, formattedText);
    });

    navigator.clipboard.writeText(discordFormattedText);
    alert("Copied as Discord formatted text!");
  };


  const resetText = () => {

    setContent("Welcome to Discord Colored Text Generator!");
  };


  const applyTextStyle= (stl:string)=> {

    const selection = window.getSelection();
    //@ts-ignore
    if (!selection.rangeCount) return;

    //@ts-ignore
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    if(stl === "bold"){
      span.style.fontWeight = "bold";
    }
    else if(stl === "underline"){
      span.style.textDecoration = "underline";
    }
    
    span.textContent = range.toString();
    range.deleteContents();
    range.insertNode(span);
    //@ts-ignore
    setContent(textRef.current.innerHTML);
  }


  return (
    <AppShell bg={"#36393F"}>
      <AppShell.Main>
        <Center>
        <Text   c={"white"} fw={800} size="40px">
          Discord <span style={{color: "#5865F2"}}>Coloured</span> Text Generator
          </Text>
        </Center>
        <Center>
          <Text c={"white"} mt={20} fw={600} size="30px">
            Create your text
          </Text>
        </Center>

        <Center >
          <Text w={800} mt={20} c={"white"} fw={500} size="20px">
          This is a simple app that creates colored Discord messages using the ANSI color codes available on the latest Discord desktop versions.
          To use this, write your text, select parts of it and assign colors to them, then copy it using the button below, and send in a Discord message.
          </Text>
        </Center>

        <Group justify="center" mt={20}>
          <Group>
            <Button size="compact-sm" h={35} w={95} color="#4F545C" onClick={resetText}>
              Reset All
            </Button>
            <Button size="compact-sm" h={35} w={95} color="#4F545C" onClick={() => applyTextStyle("bold")}>
              Bold
            </Button>
            <Button size="compact-sm" h={35} w={95} color="#4F545C" onClick={() => applyTextStyle("underline")}>
              Underline
            </Button>
          </Group>
        </Group>

     
        <Group mt={20} justify="center">
          <Text c={"white"} fw={600}>
            FG
          </Text>
          {foregroundColors.map((fg,index) => (
            <Button
              key={index}
              size="compact-sm"
              h={35}
              w={35}
              style={{ backgroundColor: fg.color }}
              onClick={() => applyColorToSelection(fg.color)}
            />
          ))}
        </Group>
        <Group mt={20} justify="center">
          <Text c={"white"} fw={600}>
            BG
          </Text>
          {backgroundColors.map((bg,index) => (
            <Button
              key={index}
              size="compact-sm"
              h={35}
              w={35}
              style={{ backgroundColor: bg.color }}
              onClick={() => applyColorToSelection2(bg.color)}
            />
          ))}
        </Group>

       
        <Group justify="center" mt={20}>
          <div
            contentEditable
            ref={textRef}
            style={{
              width: "600px",
              minHeight: "100px",
              backgroundColor: "#2F3136",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
              outline: "none",
              whiteSpace: "pre-wrap",
            }}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          />
        </Group>

        <Center>
          <Button size="compact-sm" h={35} w={225} mt={20} color="#4F545C" onClick={copyAsDiscordFormat}>
            Copy text as Discord formatted
          </Button>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
