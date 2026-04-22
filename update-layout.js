const fs = require('fs');

let layout = fs.readFileSync('app/layout.tsx', 'utf8');

layout = layout.replace(
  /<body className="min-h-full flex flex-col bg-\[#0a0a14\]">/,
  '<body className="min-h-full flex flex-col bg-[#0a0a14]">'
);

layout = layout.replace(
  /\{children\}/,
  '<main style={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>\n          {children}\n        </main>'
);

fs.writeFileSync('app/layout.tsx', layout);
