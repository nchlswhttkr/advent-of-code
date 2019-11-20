#!/bin/sh

set -e

export GITHUB_TOKEN=$1
export OAUTH_SESSION_TOKEN=$2
export LEADERBOARD_ID=$3
export YEAR=`date +%Y`
export DAY=`date +%d` # UTC time, so no math needed to adjust the day number

mkdir -p leaderboards/$YEAR
curl https://adventofcode.com/$YEAR/leaderboard/private/view/$LEADERBOARD_ID.json \
    --cookie "session=$OAUTH_SESSION_TOKEN" \
    > leaderboards/$YEAR/day-$DAY.json

git config --global user.name "Nicholas Whittaker"
git config --global user.email "26531118+nchlswhttkr@users.noreply.github.com"
git checkout master
git add leaderboards/
git commit -m "Add leaderboard for day $DAY, $YEAR"
git push https://nchlswhttkr:$GITHUB_TOKEN@github.com/nchlswhttkr/advent-of-code.git master
