const saltJob = document.getElementById('salt-import')
const efonWinetJob = document.getElementById('efon-winet-cdr')
const vodJob = document.getElementById('vod')
const checkOfflinebCallsJob = document.getElementById('check-offlineb-calls')
const checkPrevMnthCdrsJob = document.getElementById('check-prev-mnth-cdrs')
const emailConfirmationJob = document.getElementById('email-confirmation')
const generateCpegJob = document.getElementById('generate-cpeg')
const generateExcelReportJob = document.getElementById('generate-excel-report')



createVerticalLine(saltJob)
createVerticalLine(efonWinetJob)
createVerticalLine(checkOfflinebCallsJob)
createVerticalLine(checkPrevMnthCdrsJob)

createVerticalLine(emailConfirmationJob)
createVerticalLine(generateCpegJob)
createVerticalLine(generateExcelReportJob)

console.log(getElmPos(efonWinetJob), getElmPos(emailConfirmationJob));

job(emailConfirmationJob)

function job(elm) {
    createVerticalLine(elm)

    if(hasParent(elm)) {
        const parentIds = getParentIds(elm)
        const firstParentWidth = getElmPos(document.getElementById(parentIds[0])).width

        console.log(firstParentWidth);
    }
}

// get job children
function getJobDependentChildren(jobEl) {
    if(jobEl.dataset.childId === undefined) {
        return false
    } else {
        const dependentChildrenIds = JSON.parse(jobEl.dataset.childId)
        const totalChildren = dependentChildrenIds.length

        return {
            totalChildren,
            dependentChildrenIds
        }
    }

}

// get job parent
function getJobDependentParents(jobEl) {
    if(jobEl.dataset.parentId === undefined) {
        return false
    } else {
        const dependentParentIds = JSON.parse(jobEl.dataset.parentId)
        const totalParent = dependentParentIds.length
    
        return {
            totalParent,
            dependentParentIds
        }
    }
}

// create vertical line
function createVerticalLine(jobEl) {
    const numChildren = getJobDependentChildren(jobEl).totalChildren
    const numParents = getJobDependentParents(jobEl).totalParent
    let elWidth = getElmPos(jobEl).width

    if(numChildren > 0) {
        for(let i = 0; i < numChildren; i++) {
            let span = document.createElement('span')
            span.classList.add('child-dep-line-v', 'child-dep-line-v-'+ (i+1))
            if(i === 0) {
                span.style.left = (elWidth / 2) + 'px'
            } else {
                span.style.left = (elWidth / (i + 2)) + 'px'
            }
            jobEl.appendChild(span)
        }
    }

    if(numParents > 0) {
        let span = document.createElement('span')
        span.classList.add('parent-dep-line-v')
        span.style.left = (elWidth / 2) + 'px'
        jobEl.appendChild(span)
    }
}

// get element position
function getElmPos(elm) {
    return elm.getBoundingClientRect()
}


function hasParent(elm) {
    // check if a task has parent dependency
    // if yes, how many parent
        // get first & last parent centered position
    const parents = getJobDependentParents(elm)
        
    // if no, do nothing
    if(!parents) {
        return false
    } else {
        return true
    }
}

function getParentIds(elm) {
    return getJobDependentParents(elm).dependentParentIds
}