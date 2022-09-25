export interface Node {
  links?: string[];
}

/*let graph = {
	start: { A: 5, B: 2 },
	A: { start: 1, C: 4, D: 2 },
	B: { A: 8, D: 7 },
	C: { D: 6, finish: 3 },
	D: { finish: 1 },
	finish: {},
};*/

let shortestDistanceNode = (
  distances: Record<string, number>,
  visited: string[]
): string | null => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest ?? null;
};

const getDistancesFromNode = (node: Node): Record<string, number> => {
  return (
    node.links?.reduce((prev, val) => {
      return {
        ...prev,
        [val]: 1,
      };
    }, {}) ?? {}
  );
};

const findShortestPathv2 = (
  graph: Record<string, Node>,
  startNode: string,
  endNode: string
) => {
  // track distances from the start node using a hash object
  let distances: Record<string, number> = {};
  distances[endNode] = Infinity;

  distances = Object.assign(distances, getDistancesFromNode(graph[startNode]));
  // track paths using a hash object
  let parents: Record<string, string | null> = { endNode: null };
  for (let child in getDistancesFromNode(graph[startNode])) {
    parents[child] = startNode;
  }

  // collect visited nodes
  let visited: string[] = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node:
  while (node) {
    let distance = distances[node];
    const children = getDistancesFromNode(graph[node]);

    for (let child in children) {
      if (String(child) === String(startNode)) {
        continue;
      } else {
        let newDistance: number = distance + children[child];

        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newDistance) {
          // save the distance to the object
          distances[child] = newDistance;
          // record the path
          parents[child] = node; // guid
        }
      }
    }

    visited.push(node);
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};
