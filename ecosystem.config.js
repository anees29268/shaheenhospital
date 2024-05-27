module.exports = {
  apps: [
    {
      name: "shaheenhospital",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: "max", // Use all available CPUs
      exec_mode: "cluster", // Enable clustering
      watch: false, // Disable watching files for changes (useful in production)
      max_memory_restart: "1G", // Restart if using more than 1GB of memory
      env: {
        // Default environment variables
        NODE_ENV: "development",
      },
      env_local: {
        // Environment variables for local
        APP_ENV: "local",
        PORT: 3001,
      },
      env_dev: {
        // Environment variables for development
        APP_ENV: "dev",
        PORT: 3002,
        NODE_ENV: "development",
      },
      env_prod: {
        // Environment variables for production
        APP_ENV: "prod",
        PORT: 3003,
        NODE_ENV: "production",
      },
      log_date_format: "YYYY-MM-DD HH:mm Z", // Date format for logs
      error_file: "/var/log/shaheenhospital/pm2-error.log", // Path to error logs
      out_file: "/var/log/shaheenhospital/pm2-out.log", // Path to output logs
      merge_logs: true, // Merge logs from different instances
      autorestart: true, // Auto-restart on crash
      restart_delay: 5000, // Delay between restarts
    },
  ],
};
