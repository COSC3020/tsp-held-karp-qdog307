function tsp_hk(distance_matrix) {
    // Get the number of cities
    const n = distance_matrix.length;
    // If there are no cities, returun 0
    if (n === 0) return 0;

    //  recursive function 
    function heldKarp(visited, currentCity) {
        // check if all cities have been visited 
        if (visited === (1 << n) - 1) {
            return 0; // Base case
        }

        let minDistance = Infinity; // Initialize minimum distance to a very large value, this is becasue this is owrst case and will 
        //be updated with the minimum distance for each path, chat helped with changing this to infinity

        // iterate over all possible next cities
        for (let nextCity = 0; nextCity < n; nextCity++) {
            // check if the city has not been visited
            if ((visited & (1 << nextCity)) === 0) {
                const newVisited = visited | (1 << nextCity); // mark the next city as visited
                // the distance for visiting nextCity and the rest of the cities
                const distance = distance_matrix[currentCity][nextCity] + heldKarp(newVisited, nextCity);
                minDistance = Math.min(minDistance, distance); // Update the minimum distance
            }
        }

        return minDistance; // return the shortest distance for this path
    }

    let shortestPath = Infinity; // initialize the shortest path to a very large value, same as before on why the value is large 

    //This part was added with help from chat GPT, it is to iterate over each citie and find the shortest path
    for (let startCity = 0; startCity < n; startCity++) {
        shortestPath = Math.min(shortestPath, heldKarp(1 << startCity, startCity));
    }

    return shortestPath; 
}