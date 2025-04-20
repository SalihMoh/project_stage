protected $routeMiddleware = [
    // Other middlewares
    'ensure_post' => \App\Http\Middleware\EnsurePostMethod::class,
];
