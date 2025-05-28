export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">BudFrame</h1>
          <p className="text-lg text-muted-foreground">
            Build your own Docs Framework
          </p>
        </div>
      </div>
    </div>
  );
}
