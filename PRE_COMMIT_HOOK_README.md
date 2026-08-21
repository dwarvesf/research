# Git Hooks for research

This repository includes automated git hooks to ensure code quality and consistency.

## Quick Setup

### Install Hooks
```bash
./pre-commit-hook.sh install
```

### Remove Hooks (if needed)
```bash
./pre-commit-hook.sh remove
```

### Check Hook Status
```bash
./pre-commit-hook.sh status
```

## How It Works

### Hook Configuration
- **Repository**: research
- **Hook Type**: pre-commit
- **Script URL**: https://memo.d.foundation/tools/ci-lint.js

### Dynamic Script Execution
The installed hook will:
1. Download the latest script from the configured URL on each git operation
2. Execute the script with appropriate runtime (tsx for TypeScript, node for JavaScript)
3. Provide clear feedback on success or failure

### Supported Operations
- **pre-commit**: Runs before commits are created

## Available Commands

The `pre-commit-hook.sh` script supports the following commands:

- `install` - Install the pre-commit hook (default if no command specified)
- `remove` - Remove the pre-commit hook
- `status` - Show current hook status

## Manual Commands

### Check Hook Status
```bash
ls -la .git/hooks/pre-commit
```

### Test Hook Manually
```bash
.git/hooks/pre-commit
```

### Reinstall Hook
```bash
./pre-commit-hook.sh install
```

## Troubleshooting

### Hook Not Running
1. Check if hook is installed: `./pre-commit-hook.sh status`
2. Check if hook is executable: `test -x .git/hooks/pre-commit && echo "Executable" || echo "Not executable"`
3. Reinstall hook: `./pre-commit-hook.sh install`

### Network Issues
- Hooks require internet connection to fetch scripts
- Check if script URL is accessible: `curl -I https://memo.d.foundation/tools/ci-lint.js`
- Verify firewall/proxy settings

### Runtime Issues
- For TypeScript scripts: Ensure tsx is available (`npm install -g tsx`)
- For JavaScript scripts: Ensure Node.js is available (`node --version`)

### Git Submodule Issues
- If you're working in a submodule, the hook paths may be different
- The scripts handle both regular git repositories and submodules automatically

## Security Considerations

- Hooks execute scripts downloaded from: https://memo.d.foundation/tools/ci-lint.js
- Scripts are downloaded fresh for each git operation
- Temporary files are securely cleaned up after execution
- Only run this setup if you trust the script source

## Support

If you encounter issues:
1. Check the main repository's HOOK_SETUP.md for detailed documentation
2. Verify your git and Node.js setup
3. Test the script URL manually in a browser
4. Contact the repository maintainers

---

*This hook setup ensures consistent code quality for research while providing easy installation and management.*
