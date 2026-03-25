import FloatingChatWidget from "@/components/FloatingChatWidget";

const Widget = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">AIU Website Demo</h1>
        <p className="text-muted-foreground mb-6">
          This page demonstrates the floating chat widget that can be embedded on any website.
          Click the chat bubble in the bottom-right corner to open the AIU Chatbot.
        </p>
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Embed Code</h2>
          <pre className="bg-muted rounded-lg p-4 text-sm text-foreground overflow-x-auto">
{`<iframe
  src="${window.location.origin}/widget"
  style="position:fixed;bottom:0;right:0;
    width:420px;height:680px;border:none;
    z-index:9999;"
></iframe>`}
          </pre>
        </div>
      </div>
      <FloatingChatWidget />
    </div>
  );
};

export default Widget;
