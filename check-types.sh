#!/bin/bash

# ANSI color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Checking TypeScript types...${NC}"

# Run TypeScript compiler in noEmit mode to check for errors
npx tsc --noEmit

# Check if tsc exited with an error
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ TypeScript compilation successful - No type errors!${NC}"
  exit 0
else
  echo -e "${RED}✗ TypeScript compilation failed - Please fix the type errors above${NC}"
  exit 1
fi 