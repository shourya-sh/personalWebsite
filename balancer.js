import fs from 'fs';

let content = fs.readFileSync('src/pages/Games.tsx', 'utf8');

// Find the index of <form onSubmit={handleCommand}
let formIndex = content.lastIndexOf('<form onSubmit={handleCommand}');
// Find the end of this form
let endFormIndex = content.indexOf('</form>', formIndex) + '</form>'.length;

// Now from endFormIndex, we expect:
//               </>
//             )}
//           </div>
//         </div>
//       </div>

let baseStr = content.substring(0, endFormIndex);

// Let's manually rebuild the closure based on what we had.
let rebuild = `
              </>
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}
`;

content = baseStr + rebuild;

fs.writeFileSync('src/pages/Games.tsx', content);
console.log('Fixed exactly!');
