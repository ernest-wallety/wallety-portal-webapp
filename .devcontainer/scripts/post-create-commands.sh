
 Check for required environment variables
: "${GIT_USER_EMAIL:?Need to set GIT_USER_EMAIL}"
: "${GIT_USER_NAME:?Need to set GIT_USER_NAME}"

# Git config
chmod 600 $HOME/.ssh/git/id_ed25519_github
eval "$(ssh-agent -s)"
ssh-add $HOME/.ssh/git/id_ed25519_github

# Add to .bashrc
echo "chmod 600 \$HOME/.ssh/git/id_ed25519_github" >> ~/.bashrc
echo "eval \$(ssh-agent -s)" >> ~/.bashrc
echo "ssh-add \$HOME/.ssh/git/id_ed25519_github" >> ~/.bashrc

git config --global --add safe.directory /workspaces

git config --global user.email "$GIT_USER_EMAIL" && 
git config --global user.name "$GIT_USER_NAME"
