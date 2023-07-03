// extreme hack
export function copyMobile(text: string): void {
    if (document.execCommand) {
        let e = document.createElement("DIV");
        e.style.cssText = "position:fixed;top:-999px";
        e.textContent = text;
        document.body.append(e);
        // @ts-ignore
        getSelection().setBaseAndExtent(e.firstChild, 0, e.firstChild, e.textContent.length);
        if (!document.execCommand("copy")) {
            alert("your browser doesn't support copying")
        }
        e.remove();
    } else alert("your browser doesn't support copying");
}

