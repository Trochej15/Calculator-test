# Calculate Web Application Testing

This repository contains automated tests for the Calculate web application used in Chapter 9, Exercise 9.5.

## Tools Used
- Playwright for browser automation
- Azure DevOps for test execution pipeline

## Automated Tests
The tests automate arithmetic operations, invalid input handling, string length computation, and reset behavior.

## Anomalous Behavior Observed
- Result and Length fields are editable even though they are intended as output fields
- Invalid numeric input is rejected silently
- Reset clears all fields immediately without confirmation

Screenshots documenting these behaviors are included in the screenshots folder.
