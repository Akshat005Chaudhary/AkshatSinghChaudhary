---
title: 'Graphs That Stick (Part 2): My C++ Reference Collection'
slug: graphs-that-stick-part-2-cpp-reference-collection
description: >-
  This post is the second part of the Graphs That Stick series, built to give
  you reusable, memory-friendly implementations that actually stay in your head.
  Perfect for quick lookup during contests, interviews, or while debugging your
  own graph solutions.
tags:
  - DSA
  - Technical
  - Interview
added: 2025-11-03T18:30:00.000Z
---

**11. Topological Sort (DFS Based):**

```markdown
#include <iostream>
#include <vector>
#include <stack>

using namespace std;

// Perform DFS and add vertices to stack
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& topoStack) {
visited[node] = true;

    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited, topoStack);
        }
    }

    // Add the node to the stack after processing its neighbors
    topoStack.push(node);

}

// Topological Sort using DFS
void topologicalSortDFS(int V, vector<vector<int>>& adj) {
vector<bool> visited(V, false);
stack<int> topoStack;

    // Perform DFS for all unvisited nodes
    for (int i = 0; i < V; ++i) {
        if (!visited[i]) {
            dfs(i, adj, visited, topoStack);
        }
    }

    // Print the topological order
    cout << "Topological Order: ";
    while (!topoStack.empty()) {
        cout << topoStack.top() << " ";
        topoStack.pop();
    }
    cout << "\n";

}

int main() {
int V = 6; // Number of vertices
vector<vector<int>> adj(V);

    // Define edges of the graph
    adj[5].push_back(2);
    adj[5].push_back(0);
    adj[4].push_back(0);
    adj[4].push_back(1);
    adj[2].push_back(3);
    adj[3].push_back(1);

    topologicalSortDFS(V, adj);

    return 0;

}
```

Time Complexity: O(V+E)

***

**12. Topological Sort (Kahn's Algorithm):**

```
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// Perform topological sort using Kahn's Algorithm
void topologicalSortKahn(int V, vector<vector<int>>& adj) {
vector<int> inDegree(V, 0); // Store in-degrees of vertices

    // Calculate in-degrees for all vertices
    for (int i = 0; i < V; ++i) {
        for (int neighbor : adj[i]) {
            inDegree[neighbor]++;
        }
    }

    queue<int> q;
    // Add all vertices with in-degree 0 to the queue
    for (int i = 0; i < V; ++i) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }

    vector<int> topoOrder;

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        topoOrder.push_back(node);

        // Reduce in-degree of neighbors and add to queue if in-degree becomes 0
        for (int neighbor : adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }

    // Check for cycle
    if (topoOrder.size() != V) {
        cout << "The graph has a cycle. Topological sorting not possible.\n";
        return;
    }

    // Print the topological order
    cout << "Topological Order: ";
    for (int node : topoOrder) {
        cout << node << " ";
    }
    cout << "\n";

}

int main() {
int V = 6; // Number of vertices
vector<vector<int>> adj(V);

    // Define edges of the graph
    adj[5].push_back(2);
    adj[5].push_back(0);
    adj[4].push_back(0);
    adj[4].push_back(1);
    adj[2].push_back(3);
    adj[3].push_back(1);

    topologicalSortKahn(V, adj);

    return 0;

}
```

Time Complexity: O(V+E)

***

**13. Bipartite Graph (Using BFS):**

```
#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> constructadj(int V, vector<vector<int>> &edges){

    vector<vector<int>> adj(V);
    for(auto it:edges){
        adj[it[0]].push_back(it[1]);
        adj[it[1]].push_back(it[0]);
    }
    return adj;
}
// Function to check if the graph is Bipartite using BFS
bool isBipartite(int V, vector<vector<int>> &edges) {

    // Vector to store colors of vertices.
    // Initialize all as -1 (uncolored)
    vector<int> color(V, -1);

    //create adjacency list
    vector<vector<int>> adj = constructadj(V,edges);
    // Queue for BFS
    queue<int> q;

    // Iterate through all vertices to handle disconnected graphs
    for(int i = 0; i < V; i++) {

        // If the vertex is uncolored, start BFS from it
        if(color[i] == -1) {

            // Assign first color (0) to the starting vertex
            color[i] = 0;
            q.push(i);

            // Perform BFS
            while(!q.empty()) {
                int u = q.front();
                q.pop();

                // Traverse all adjacent vertices
                for(auto &v : adj[u]) {

                    // If the adjacent vertex is uncolored,
                    // assign alternate color
                    if(color[v] == -1) {
                        color[v] = 1 - color[u];
                        q.push(v);
                    }

                    // If the adjacent vertex has the same color,
                    // graph is not bipartite
                    else if(color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
    }

    // If no conflicts in coloring, graph is bipartite
    return true;
}

int main() {
    int V = 4;
    vector<vector<int>> edges = {{0, 1}, {0, 2}, {1, 2}, {2, 3}};
    if(isBipartite(V, edges))
        cout << "true";
    else
        cout << "false";

    return 0;
}
```

***

**14. Bipartite Graph (Using DFS):**

```
#include <bits/stdc++.h>
using namespace std;


vector<vector<int>> constructadj(int V, vector<vector<int>> &edges){

    vector<vector<int>> adj(V);
    for(auto it:edges){
        adj[it[0]].push_back(it[1]);
        adj[it[1]].push_back(it[0]);
    }
    return adj;
}

// Helper function for DFS to check bipartite graph
bool dfs(int u, int color, vector<int> &colors,
                           vector<vector<int>> &adj) {

    // Assign color to the current u
    colors[u] = color;

    // Iterate through all adjacent vertices
    for(auto &v : adj[u]) {
        if(colors[v] == -1) {

            // Assign alternate color to the adjacent u
            if(!dfs(v, 1 - color, colors, adj))
                return false;
        }
        else if(colors[v] == color) {

            // If the adjacent u has the same color,
            // it's not bipartite
            return false;
        }
    }
    return true;
}

// Function to check if the graph is Bipartite using DFS
bool isBipartite(int V, vector<vector<int>> &edges) {

    // Initialize all vertices as uncolored
    vector<int> colors(V, -1);

    // create adjacency list
    vector<vector<int>> adj = constructadj(V,edges);

    // Check each component of the graph
    for(int i = 0; i < V; i++) {

        // If the vertex is uncolored
        if(colors[i] == -1) {

            // If DFS fails, the graph is not bipartite
            if(!dfs(i, 0, colors, adj))
                return false;
        }
    }

    // All vertices can be colored bipartitely
    return true;
}

int main() {

    int V = 4;
    vector<vector<int>> edges = {{0, 1}, {0, 2}, {1, 2}, {2, 3}};
    if(isBipartite(V, edges))
        cout << "true";
    else
        cout << "false";

    return 0;
}
```

***

**15. Cycle Detection in Undirected Graph (Using BFS):**

```
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool isCyclic(vector<vector<int>>& graph, int vertices) {
    vector<bool> visited(vertices, false);

    // To track the parent node for cycle detection
    for (int i = 0; i < vertices; ++i) {
        if (!visited[i]) {
            // Start BFS from unvisited node
            queue<pair<int, int>> q; // {node, parent}
            visited[i] = true;
            q.push({i, -1});  // No parent for the starting node

            while (!q.empty()) {
                int node = q.front().first;
                int parent = q.front().second;
                q.pop();

                // Traverse all neighbors of the node
                for (int neighbor : graph[node]) {
                    // If the neighbor is visited and is not the parent, then cycle exists
                    if (visited[neighbor] && neighbor != parent)
                        return true;

                    // If the neighbor is not visited, mark it as visited and add to the queue
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        q.push({neighbor, node});
                    }
                }
            }
        }
    }

    return false;
}

int main() {
    int vertices = 5;
    vector<vector<int>> graph(vertices);

    // Example graph (undirected)
    graph[0].push_back(1);
    graph[1].push_back(0);
    graph[1].push_back(2);
    graph[2].push_back(1);
    graph[2].push_back(3);
    graph[3].push_back(2);
    graph[3].push_back(4);
    graph[4].push_back(3);
    graph[4].push_back(1); // This edge creates a cycle

    if (isCyclic(graph, vertices))
        cout << "Graph contains a cycle." << endl;
    else
        cout << "Graph doesn't contain a cycle." << endl;

    return 0;
}
```

***

**16. Cycle Detection in Directed Graph (Using Kahn's Algorithm):**

> Note: In a directed graph, you can use Kahn’s Algorithm for topological sorting. A cycle exists in the graph if you can't process all vertices (i.e., there are still nodes with non-zero in-degrees after the algorithm finishes).Basically if a cycle exists in the graph that means that topological sort was not possible or vice-versa.-- Refer 12th section of 'Graph Standards2' --
