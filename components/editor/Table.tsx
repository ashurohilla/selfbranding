import React from 'react';

const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <div className="my-8 w-full overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm shadow-lg">
      <table 
        className="w-full text-left text-sm text-neutral-300 [&_th]:p-4 [&_th]:font-bold [&_th]:text-white [&_th]:bg-white/5 [&_td]:p-4 [&_td]:border-t [&_td]:border-white/5 [&_tr:hover]:bg-white/[0.02] transition-colors" 
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export default Table;