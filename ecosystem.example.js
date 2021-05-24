module.exports = {
  apps: [
    {
      name: 'dnd-plus',
      script: './src/prod.ts',
      cwd: './dnd-plus/packages/server',
      interpreter_args: '-r tsconfig-paths/register',
      watch: false,
      log_date_format: 'YYYY-MM-DD HH:mm',
      env: {
        NODE_ENV: 'production',
        NODE_PATH: './src',
        PORT: 80,
        JWT_SECRET: 'JWT_SECRET',
      },
    },
  ],
}
